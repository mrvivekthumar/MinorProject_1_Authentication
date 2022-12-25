#include <stdio.h>

double expo(int ,int);

int main()
{
    int x,y,ans;
    printf("enter the number you want to find exponential and base respectively :");
    scanf("%d %d",&x,&y);

    printf("%d",expo(x,y));

    return 0;
}

double expo(int a ,int b)
{
    int x;

    x = a*exp(a,b-1);

    return 0;

}
