def getStressLevel(hr,gsr):
    stress_level = 0
    if(hr<60 or hr>200):
        stress_level = 9

    if(hr>60 and hr<100):
        if(gsr>0 and gsr<100):
            stress_level = 4
        if(gsr>101 and gsr<200):
            stress_level = 3
        if(gsr>201 and gsr<300):
            stress_level = 2
        if(gsr>301 and gsr<400):
            stress_level = 1
        if(gsr>400 and gsr<512):
            stress_level = 0

    if(hr>=100 and hr<=130):
        if(gsr>0 and gsr<100):
            stress_level = 5
        if(gsr>101 and gsr<200):
            stress_level = 4
        if(gsr>201 and gsr<300):
            stress_level = 3
        if(gsr>301 and gsr<400):
            stress_level = 2
        if(gsr>400 and gsr<512):
            stress_level = 1

    if(hr>=130 and hr<=150):
        if(gsr>0 and gsr<100):
            stress_level = 6
        if(gsr>101 and gsr<200):
            stress_level = 5
        if(gsr>201 and gsr<300):
            stress_level = 4
        if(gsr>301 and gsr<400):
            stress_level = 3
        if(gsr>400 and gsr<512):
            stress_level = 2
        
    if(hr>=150 and hr<=180):
        if(gsr>0 and gsr<100):
            stress_level = 7
        if(gsr>101 and gsr<200):
            stress_level = 6
        if(gsr>201 and gsr<300):
            stress_level = 5
        if(gsr>301 and gsr<400):
            stress_level = 4
        if(gsr>400 and gsr<512):
            stress_level = 3
    return stress_level