console.log("Workbench Started!");
task.screenId = getPublicScreenId();
openWindow(task,task.screenId,0,40,200,100,'Workbench',{order: true, close: true});
beginLoop("lp_workbench");
endLoop(task, "lp_workbench", true);