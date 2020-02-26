# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

import os

import csv


csvpath = os.path.join('/Users/shailaja/shailaja/projects/UTDataAnalysis/class_repo/python-challenge/PyBank/Resources', 'budget_data.csv')

with open(csvpath, newline='') as csvfile:

    csvreader = csv.reader(csvfile, delimiter=',')
    header = next(csvreader)
   
    row1=next(csvreader)
    row2=next(csvreader)
    count=2
    total_p_l=int(row1[1])+int(row2[1])
    total_changes=int(row2[1])-int(row1[1])
    profit_change=int(row2[1])-int(row1[1])
    loss_change=int(row2[1])-int(row1[1])
    prev = int(row2[1])
    
    greatest_inc=int(row1[1])
    greatest_dec=int(row1[1])
    profit_date=row1[0]
    loss_date=row1[0]
    profits = []
    losses = []
    for row in csvreader:
        count=count+1
        val = int(row[1])
        total_p_l=total_p_l+val
        newchange=val-prev
        total_changes=total_changes+newchange
        if profit_change < newchange:
            profit_change = newchange
            profit_date = row[0]
        if loss_change > newchange:
            loss_change = newchange
            loss_date = row[0]
        prev=val
    print("Financial Analysis")
    print("------------------")
    print(f"TOTAL number of months is: {count}")
    print(f"TOTAL profit or loss is: {total_p_l}")
    average = total_changes/(count-1)
    print(f"AVERAGE change is {average}")
    print(f"Greatest Increase in Profits: {profit_date} ({profit_change})")
    print(f"Greatest Decrease in Losses: {loss_date} ({loss_change})")


f = open("/Users/shailaja/shailaja/projects/UTDataAnalysis/class_repo/python-challenge/PyBank/result.txt", "w")
print("Financial Analysis",file=f)
print("------------------",file=f)
print(f"TOTAL number of months is: {count}",file=f)
print(f"TOTAL profit or loss is: {total_p_l}",file=f)
print(f"AVERAGE change is {average}",file=f)
print(f"Greatest Increase in Profits: {profit_date} ({profit_change})",file=f)
print(f"Greatest Decrease in Losses: {loss_date} ({loss_change})",file=f)
f.close()