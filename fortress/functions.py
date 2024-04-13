import numpy as np
import math

def coord(v_s, theta_s, v_w, theta_w, k):
    '''
    v_s : 발사 속도 (파워)
    theta_s : 발사 각도
    v_w : 풍속
    theta_w : 풍향
    k : 저항값
    '''
    g = 9.8
    a_s = math.radians(theta_s)
    a_w = math.radians(theta_w)
    
    t_end = round((2 * (v_s * math.sin(a_s) + v_w * math.sin(a_w)) / g) * (1 - k), 2)
    
    x = []
    y = []
    t_list = list(np.arange(0, t_end, 0.1))
    t_list.append(t_end)
    
    for i in range(len(t_list)):
        t = t_list[i]
        x_coord = round(v_s * math.cos(a_s) * t + v_w * math.cos(a_w) * t, 2)
        y_coord = round(v_s * math.sin(a_s) * t - (1/2)*g*(t**2) + v_w * math.sin(a_w) * t, 2)
        x.append(x_coord)
        y.append(y_coord)
    
    return x, y