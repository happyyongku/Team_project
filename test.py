#%%
hexaDict = {f'{i:X}' : f'{i:04b}' for i in range(16)}


a = '0000000068B46DDB9346F40000'
b=''
for i in a:
    b += hexaDict[i]

print(hexaDict)
print(b)
#%%

list1 = [0,1,2,3,4,5,6,7,8,9]
idx = len(list1) - 1
print(idx)
print(list1[idx-6:idx+1])
print(list(range(0,112,7*2)))

#%%

f = False
idx = 9
list1 = [0,1,2,3,4,5,6,7,8,9]
while idx >= 0:
    print(f)
    if list1[idx] < 5:
        f = True
    idx -= 1
re = set()
print(re)
#%%

def func():
    global idx
    rate = []
    trigger = False
    while True:
        if code[idx] == '0':
            cnt0 += 1
            idx += 1
            if cnt1 > 0:
                rate.append(cnt1)
                cnt1 = 0
                if trigger:
                    idx -= 1
                    return rate
                trigger = True
        else:
            cnt1 += 1
            idx += 1
            if cnt0 > 0:
                rate.append(cnt0)
                cnt0 = 0

#%%
list1 = [4,6,8]
list2 = [x/2 for x in list1]
dict3 = [[2,3,4], [1,2,3], [3,4,5]]
print(dict3)

if list2 in dict3:
    print(list2)
    print('Ture')
print(int(2.0))

if [1,2,3] == [1.0,2.0,3.0]:
    print('True')
else:
    print('No')

print(dict3[7:9])