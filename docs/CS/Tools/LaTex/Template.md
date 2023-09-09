# 一些LaTex写作的一些基础模板

## 1. 基础的中文写作模板
```LaTex
\documentclass{article}
\usepackage[UTF8]{ctex}
%插入表格所需要的包
\usepackage{graphicx}
\usepackage{multirow}
\newcommand{\tabincell}[2]{\begin{tabular}{@{}#1@{}}#2\end{tabular}}
%插入公式所需要的包
\usepackage{amsmath}
%引用，自己定义颜色
\usepackage[colorlinks, linkcolor=blue, anchorcolor=green, citecolor=red]{hyperref}
%超链接
\usepackage{url}
%Author: Unlome
%正文
%标题
\title{学习笔记}
%作者
\author{mxt}
\maketitle
%章节
\section{Model}
This is an equation (\ref{eq:1}) and the picture is shown in Fig. \ref{fig:1}, where $AB^2$ is xxxxxx.
%公式
\begin{equation}
    \label{eq:1}
    \begin{aligend}
        AB^2=BC^2+AC^2
    \end{aligend}
\end{equation}

%表格
\begin{table}
\end{table}

\end{document}


```