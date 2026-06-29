//时间片轮转法，不考虑进程阻塞态
#include <stdio.h>
#include <unistd.h>
//定义进程控制块
typedef struct pcbStruct
{
	int pid;         //进程号
    char name[10];    //进程名称
	int status;      //进程状态 1－运行  2－就绪   0－完成
	int type;			// 进程类别 0－系统 进程 1－用户进程
	int totalTime;		//进程需要运行的总时间长度
	int runTime;		//进程已经完成时间（从0开始）
	int count;         //进程当前时间片已经完成的时间
    int prio;         //进程优先级，优先数越小，优先级别越大
    struct pcbStruct *next;  //下一个进程控制块指针
} PCB;
PCB *finish,*ready,*run;//三种状态的进程队列首指针，每个队列的PCB用单向链指针连接
PCB *tail_ready;//就绪队列的尾指针，因为新就绪的进程总是插入就绪队列的尾部
int N;                //进程总数
int timeSlice=2;     //时间片大小

//随机数生成函数，生成优先数
int randomPrio(double from,double to){//产生from到to之间的随机数
	return 1+(int)((to)*rand()/(RAND_MAX+from));
}

//将就绪队列中的第一个进程投入运行
void runIn()
{
	//就绪队列头指针赋值给运行头指针
    run=ready;  //运行进程
    run->status=1;     //进程状态从就绪态变为运行态
    ready=ready->next; //就绪队列头指针后移到下一进程
    if (ready==NULL)
    	tail_ready=NULL;
}

//进程p插入就绪队列尾部
void insertReady(PCB *p)
{
	tail_ready->next=p;
	tail_ready=p;  //指向新尾部
	p->next=NULL;//插入队列尾部
}

//功能：创建所有进程，并将首个就绪进程置为运行态
void creat()      //创建进程组PCB
{
	PCB *p;
	int i,time;
	char name[10];
	//初始化各种队列头指针
	ready=NULL;     //就绪队列
	finish=NULL;    //完成队列头指针
	run=NULL;      //运行队列指针
    printf("请输入每个进程名字和需要运行时间，比如：pid1[回车]10[回车]:\n");
    //下面创建N个新进程，并插入就绪队列
	for(i=1;i<=N;i++)
	{   //创建进程i
		p=malloc(sizeof(PCB));//为进程i分配PCB
		p->pid=1000+i;        //分配pid
		scanf("%s",name);
		scanf("%d",&time);
		strcpy(p->name,name);//登记该进程的名字和需要运行的时间
		p->status=2;        //进程状态初始为就绪状态
		if(i%2==0){  //有一半进程为系统进程，另一半为用户进程
			p->type=0;//系统进程
			p->prio=randomPrio(1.0,9.0);//系统进程优先级（优先数越小优先级越高）
		}else {
			p->type=1;//用户进程
			p->prio=randomPrio(11.0,19.0);//用户进程优先级
		}
		p->totalTime=time; //总的有效运行时间
		p->count=0;
		p->runTime=0;
		if (ready!=NULL)  //已经创建了就绪队列
			insertReady(p);//把进程i插入就绪队列尾部
		else {   //系统尚未创建就绪队列
			p->next=NULL;  //创建就绪队列的第一个进程
			ready=p;   //就绪队列的首指针指向它
			tail_ready=p;//记住就绪队列的尾巴节点，以便以后插入新节点
		}
	}
	printf("\n*******开始执行****************\n");
	//将就绪队列的第一个进程投入运行
	run=ready;//取出首个就绪进程运行
	ready=ready->next;//调整就绪队列首指针
	run->status=1;//修改要运行的进程为运行态
}

//调度算法：时间片轮转法
void timeRoundRun()
{
	int k=0; //当前时刻计数器
	while (run!=NULL)  //每次循环相当于时间推进一个单位
		{
		    k++;   //当前时刻k
			//对当前正在运行的进程模拟时间流逝1个单位
			run->runTime=run->runTime+1;//当前执行进程的完成时间增加1
			run->count=run->count+1; //当前进程的当前时间片已经用过的时间长度增加1
			sleep(1);  //模拟进程的工作
			printf("\n时刻%d :进程%s ",k,run->name);

			//下面检查当前时刻当前正在运行的进程是否运行结束，如是，则将它插入完成队列
			if(run->runTime>=run->totalTime)  //运行是否结束？
			{
				//当前正在运行的进程运行结束,
				run->next=finish;
				finish=run;//把这个进程插入结束ready队列的头部
				run->status=0;//进程的状态为结束态
				run=NULL;//处理机空闲
				printf(",进程完成。 ");

				//如果就绪队列不空，将第一个进程投入进行
				if (ready!=NULL)
				{
					runIn();
					printf("进程%s开始运行。 ",run->name);
				}
				else
				{
					printf("\n时刻%d :all is over\n",k);
					break;
				}//END OF if (ready!=NULL)
			}//if(run->runTime>=run->totalTime)  运行结束处理

//当前运行的进程尚未运行结束。下面检查这个进程的本次时间片是否用光，如用光则进入就绪队列
			else if(run->count==timeSlice) //当前进程的时间片是否用光？
			{
				//下面是时间片结束处理
				run->count=0;        //置时间片计数器为0
				printf(",%s用完一个时间片,",run->name);
				 //将进程插入到就绪队列尾部等待轮转
				 run->status=2;//正在运行的进程状态从运行态改到就绪态
				 PCB *p=run;
				 if (ready==NULL)
				 {
					 p->next=NULL;
					 ready=p;//就绪队列首指针指向当前进程
					 tail_ready=p;
				 }
				 else
				     insertReady(p);//并插入就绪队列尾部
				 //将就绪队列的第一个进程投入运行,就绪队列不空
				  runIn();
				  printf("进程%s开始运行\n",run->name);
			}  //end of  elseif(run->count==timeSlice)  前面是当前时间片用光处理
		}  //end of while(jobs>0)
}

// 调度算法：高优先级算法
void priorityRun()
{
    int k = 0; // 当前时刻计数器
    while (run != NULL) {
        k++; // 当前时刻k
        // 对当前正在运行的进程模拟时间流逝1个单位
        run->runTime = run->runTime + 1; // 当前执行进程的完成时间增加1
        run->count = run->count + 1;    // 当前进程的当前时间片已经用过的时间长度增加1
        sleep(1);                       // 模拟进程的工作
        printf("\n时刻%d :进程%s ", k, run->name);

        // 下面检查当前时刻当前正在运行的进程是否运行结束，如是，则将它插入完成队列
        if (run->runTime >= run->totalTime) { // 运行是否结束？
            // 当前正在运行的进程运行结束,
            run->next = finish;
            finish = run;        // 把这个进程插入结束ready队列的头部
            run->status = 0;     // 进程的状态为结束态
            run = NULL;          // 处理机空闲
            printf(",进程完成。 ");

            // 如果就绪队列不空，将具有最高优先级的进程投入运行
            if (ready != NULL) {
                PCB* highestPriority = ready;
                PCB* current = ready->next;

                // 找到优先级最高的进程
                while (current != NULL) {
                    if (current->prio < highestPriority->prio) {
                        highestPriority = current;
                    }
                    current = current->next;
                }

                // 将最高优先级的进程从就绪队列中移除
                if (highestPriority == ready) {
                    ready = ready->next;
                } else {
                    current = ready;
                    while (current->next != highestPriority) {
                        current = current->next;
                    }
                    current->next = highestPriority->next;
                }

                highestPriority->next = NULL;
                run = highestPriority;
                run->status = 1; // 修改要运行的进程为运行态
                printf("进程%s开始运行。 ", run->name);
            } else {
                printf("\n时刻%d :all is over\n", k);
                break;
            } // END OF if (ready != NULL)
        } // if(run->runTime >= run->totalTime) 运行结束处理

        // 当前运行的进程尚未运行结束。下面检查这个进程的本次时间片是否用光，如用光则进入就绪队列
        else if (run->count == timeSlice) { // 当前进程的时间片是否用光？
            // 下面是时间片结束处理
            run->count = 0;             // 置时间片计数器为0
            printf(",%s用完一个时间片,", run->name);
            // 将进程插入到就绪队列尾部等待轮转
            run->status = 2; // 正在运行的进程状态从运行态改到就绪态
            PCB* p = run;
            if (ready == NULL) {
                p->next = NULL;
                ready = p;       // 就绪队列首指针指向当前进程
            } else
                insertReady(p); // 并插入就绪队列尾部
            // 将就绪队列的优先级最高的进程投入运行,就绪队列不空
            PCB* highestPriority = ready;
            PCB* current = ready->next;

            // 找到优先级最高的进程
            while (current != NULL) {
                if (current->prio < highestPriority->prio) {
                    highestPriority = current;
                }
                current = current->next;
            }

            // 将最高优先级的进程从就绪队列中移除
            if (highestPriority == ready) {
                ready = ready->next;
            } else {
                current = ready;
                while (current->next != highestPriority) {
                    current = current->next;
                }
                current->next = highestPriority->next;
            }

            highestPriority->next = NULL;
            run = highestPriority;
            run->status = 1; // 修改要运行的进程为运行态
            printf("进程%s开始运行\n", run->name);
        } // end of if(run->count == timeSlice) 前面是当前时间片用光处理
    }     // end of while(jobs>0)
}


//入口
int main()
{
   printf("请输入进程总数\n");
   scanf("%d",&N);             //输入进程数
   creat();          //创建所有进程，并将首个就绪进程置为运行态
   priorityRun();  //按优先级调度运行
   printf("全部进程运行结束！");
   return 1;
}
#!/bin/bash

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

int main() {
    pid_t parent_pid = getpid();
    pid_t child_pid, grandchild_pid;

    // 创建子进程
    child_pid = fork();

    if (child_pid < 0) {
        perror("创建子进程失败");
        exit(1);
    } else if (child_pid == 0) {
        // 子进程
        printf("子进程（PID %d）正在执行。\n", getpid());

        // 设置子进程的工作时间较短
        sleep(2);

        printf("子进程（PID %d）已完成。\n", getpid());
    } else {
        // 父进程
        printf("父进程（PID %d）正在执行。\n", parent_pid);

        // 创建孙子进程
        grandchild_pid = fork();

        if (grandchild_pid < 0) {
            perror("创建孙子进程失败");
            exit(1);
        } else if (grandchild_pid == 0) {
            // 孙子进程
            printf("孙子进程（PID %d）正在执行。\n", getpid());

            // 设置孙子进程的工作时间较长
            sleep(4);

            printf("孙子进程（PID %d）已完成。\n", getpid());
        } else {
            // 父进程
            // 设置儿子和孙子的优先级
            nice(10); // 儿子的优先级最低
            nice(-10); // 孙子的优先级最高

            // 父进程等待子进程和孙子进程结束
            wait(NULL);
            wait(NULL);

            printf("父进程（PID %d）已完成。\n", parent_pid);
        }
    }

    return 0;
}
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

typedef struct pcbStruct {
    int pid;
    char name[10];
    int status;
    int type;
    int totalTime;
    int runTime;
    int count;
    int prio;
    struct pcbStruct* next;
} PCB;

PCB* finish, * ready, * run;
PCB* tail_ready;
int N;
int timeSlice = 2;

int randomPrio(double from, double to) {
    return 1 + (int)((to)*rand() / (RAND_MAX + from));
}

void runIn() {
    run = ready;
    run->status = 1;
    ready = ready->next;
    if (ready == NULL)
        tail_ready = NULL;
}

void insertReady(PCB* p) {
    tail_ready->next = p;
    tail_ready = p;
    p->next = NULL;
}

void creat() {
    PCB* p;
    int i, time;
    char name[10];
    ready = NULL;
    finish = NULL;
    run = NULL;
    printf("请输入每个进程名字和需要运行时间，比如：pid1[回车]10[回车]:\n");
    for (i = 1; i <= N; i++) {
        p = malloc(sizeof(PCB));
        p->pid = 1000 + i;
        scanf("%s", name);
        scanf("%d", &time);
        strcpy(p->name, name);
        p->status = 2;
        if (i % 2 == 0) {
            p->type = 0;
            p->prio = randomPrio(1.0, 9.0);
        }
        else {
            p->type = 1;
            p->prio = randomPrio(11.0, 19.0);
        }
        p->totalTime = time;
        p->count = 0;
        p->runTime = 0;
        if (ready != NULL)
            insertReady(p);
        else {
            p->next = NULL;
            ready = p;
            tail_ready = p;
        }
    }
    printf("\n*******开始执行****************\n");
    run = ready;
    ready = ready->next;
    run->status = 1;
}

void highPriorityRun() {
    int k = 0;
    while (run != NULL) {
        k++;
        run->runTime = run->runTime + 1;
        run->count = run->count + 1;
        sleep(1);
        printf("\n时刻%d :进程%s  优先级为%d", k, run->name,run->prio);

        if (run->runTime >= run->totalTime) {
            run->next = finish;
            finish = run;
            run->status = 0;
            run = NULL;
            printf(",进程完成。 ");

            if (ready != NULL) {
                runIn();
                printf("进程%s开始运行。 ", run->name);
            }
            else {
                printf("\n时刻%d :all is over\n", k);
                break;
            }
        }
        else if (run->count == timeSlice) {
            run->count = 0;
            printf(",%s用完一个时间片,", run->name);
            run->status = 2;
            PCB* p = run;
            if (ready == NULL) {
                p->next = NULL;
                ready = p;
                tail_ready = p;
            }
            else
                insertReady(p);
            runIn();
            printf("进程%s开始运行\n", run->name);
        }
    }
}

int main() {
    printf("请输入进程总数\n");
    scanf("%d", &N);
    creat();
    highPriorityRun();
    printf("全部进程运行结束！");
    return 1;
}
