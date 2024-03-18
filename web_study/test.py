import sys
sys.stdin = open('./5205_input.txt')

def quick(arr, l, r):
    

    N = len(arr)
    if len(arr) <= 1 or l>r or l >= len(arr):
        return
    
    p = arr[l]
    i = l + 1
    j = r

    while i <= j < N:
        while i <= j < N and arr[i] <= p:
            i += 1
        while i <= j < N and arr[j] >= p:
            j -= 1
        if i <= j < N:
            arr[i], arr[j] = arr[j], arr[i]
    print(l, j)
    if 0 <= j < N : 
        arr[l], arr[j] = arr[j], arr[l]

    quick(arr[:j], l, j-1)
    quick(arr[j+1:], j+1, r)
    return



for tc in range(1, int(input())+1):
    N = int(input())
    arr = list(map(int, input().split()))
    quick(arr, 0, len(arr)-1)
    print(f'#{tc} {arr}')
