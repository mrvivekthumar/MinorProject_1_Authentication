#include <stdio.h>
#include <stdlib.h>

struct student
{
    char name[20];
    int no;
    struct sub
    {
        float pps;
        float bee;
        float maths;
    } marks;

} stds[3];

int main()
{

    for (int i = 0; i < 1; i++)
    {
        printf("name: ");
        scanf(" %s", stds[i].name);
        printf("no: ");
        scanf(" %d", &stds[i].no);
        printf("pps: ");
        scanf(" %f", &stds[i].marks.pps);
        printf("bee: ");
        scanf(" %f", &stds[i].marks.bee);
        printf("maths: ");
        scanf(" %f", &stds[i].marks.maths);
    }

    system("cls");

    printf("-----------------------\n");
    for (int i = 0; i < 1; i++)
    {
        printf("name: %s\n", stds[i].name);
        printf("no: %d\n", stds[i].no);
        printf("pps: %.2f\n", stds[i].marks.pps);
        printf("pps: %.2f\n", stds[i].marks.bee);
        printf("pps: %.2f\n", stds[i].marks.maths);
    }

    return 0;
}
