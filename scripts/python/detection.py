import requests

modulesAvailable = False

try:
        from time import sleep
        from datetime import datetime
        from gpiozero import MotionSensor
        from gpiozero import LED

        modulesAvailable = True

except ImportError:
        print('[alb3rt-sensor] Error')
        requests.get('http://127.0.0.1:4007/api/motion', verify=False, headers={})

if modulesAvailable == True:
        pir = MotionSensor(4)
        led = LED(17)

        def getTimestamp():
                return int(datetime.now().strftime('%s'))

        timestamp = getTimestamp()
        ip = "192.168.1.118"
        port = "4007"
        data = {"ip": ip, "port": port, "camera": "1", "timestamp": timestamp}

        while True:
                if pir.motion_detected:
                        time = getTimestamp()
                        timeDiff = time - timestamp
                        if timeDiff > 2:
                                timestamp = time
                                print('[alb3rt-sensor-event] Motion-detected, timestamp-%s') % timestamp
                                led.on()

                                try:
                                        response = requests.post('http://127.0.0.1:4007/api/motion', json=data)
                                        if response.status_code == 200:
                                                print('[alb3rt-sensor] Motion reported successfully.')
                                except requests.exceptions.RequestException as error:
                                        print('[alb3rt-sensor] Request error - motion not reported!')
                                        print('[alb3rt-sensor] %s') % error
                                sleep(1)
                                led.off()