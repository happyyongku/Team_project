# import os
# import sys
# sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from functions import coord
import matplotlib.pyplot as plt

#%%

x_list, y_list, t_list= coord(100, 45, 0, 0, 0)
plt.plot(x_list, y_list)
plt.show
#%%
