import threading
import time
import sys

done = False


class Animated(threading.Thread):
    def __init__(self, name, *args, **kwargs):
        threading.Thread.__init__(self)
        self.name = name

    def run(self):
        # super().run()
        print("starting thread %s" % self.name)
        self.print_loadbar()
        print("ending thread %s" % self.name)
        return

    def print_loadbar(self):
        while True:
            if done:
                break
            sys.stdout.write('\r[---    ]')
            sys.stdout.flush()
            time.sleep(0.5)
            sys.stdout.write('\r[    ---]')
            sys.stdout.flush()
            time.sleep(0.5)
        print("Thread is done")


def print_funk_you_for_ali():
    ali = "fuck you ali"
    animation = "|/-\\"
    anicount = 0
    index = 0 
    counttime = 0        
    while counttime != 100:
         
        time.sleep(0.075)  
        
        res = ''
        load_str_list = list(ali)
        x = ord(load_str_list[index]) 
        
        if x != 32 and x != 46:              
            if x > 90: 
                y = x-32
            else: 
                y = x + 32
            load_str_list[index]= chr(y) 
        
        for i in load_str_list:
            res += i

        sys.stdout.write("\r"+res + animation[anicount]) 
        sys.stdout.flush() 
        
        anicount = (anicount + 1)% 4
        index = (index + 1) % len(ali)  
        counttime = counttime + 1

def main():
    print_funk_you_for_ali()
    # global done
    # Animated("amimation").start()
    # c = 0
    # while c < 10:
    #     time.sleep(1)
    #     c = c+1
    # done = True


if __name__ == '__main__':
    main()
