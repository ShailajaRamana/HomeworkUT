# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

import os

import csv

csvpath = os.path.join('/Users/shailaja/shailaja/projects/UTDataAnalysis/class_repo/python-challenge/PyPoll/Resources',"election_data.csv")


with open(csvpath, newline='') as csvfile:

    csvreader = csv.reader(csvfile, delimiter=',')
    header = next(csvreader)
   
    row1=next(csvreader)
    row2=next(csvreader)
    count=2
    candidates = {}
    candidates[row1[2]]=1
    candidates[row2[2]]=1

    for row in csvreader:
        count=count+1
        if row[2] not in candidates:
            candidates[row[2]]=1
        else:
            candidates[row[2]]=candidates[row[2]]+1

    print("Election Results")
    print("------------------")
    print(f"TOTAL votes: {count}")
    print("------------------")
    count_candidates = candidates.copy()
    for candidate in candidates:
        print(f"{candidate}: {candidates[candidate]/count*100}% ({candidates[candidate]})")
    print("------------------")
    sorted_candidates = sorted(candidates.items(), key=lambda x: x[1],reverse = True)
    print("Winner : "+sorted_candidates[0][0])
    print("------------------")
    
f = open("/Users/shailaja/shailaja/projects/UTDataAnalysis/class_repo/python-challenge/PyPoll/result.txt", "w")
print("Election Results",file=f)
print("------------------",file=f)
print(f"TOTAL votes: {count}",file=f)
print("------------------",file=f)
for candidate in candidates:
        print(f"{candidate}: {candidates[candidate]/count*100}% ({candidates[candidate]})",file=f)
print("------------------",file=f)
print("Winner : "+sorted_candidates[0][0],file=f)
print("------------------",file=f)
f.close()
