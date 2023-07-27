console.log("New CLI");

task.screenId = getPublicScreenId();
openWindow(task,task.screenId,0,20,200,100,'New CLI',{order: true, close: true});

/*************************/
/** Load script **********/
/*************************/

task.result = loadScript(task.params);
beginLoop("lp_load_script");
task.c = equals(task.result.isFulfilled(), true);
endLoop(task, "lp_load_script", !task.c);
task.script = convertScriptToJS(task.id, task.result.getData().data);

/*************************/
/** Process script *******/
/*************************/

task.lineIndex = 0;
task.lineCount = task.script.length;
beginLoop("lp_process_script_loop");
task.line = task.script[task.lineIndex];

/*************************/
/** Get task id **********/
/*************************/

task.getSubTaskId = eval(task.line);
task.subTaskId = undefined;
task.getSubTaskId.then(function (result) { task.subTaskId = result; });
beginLoop("lp_get_task_id_loop");
endLoop(task,"lp_get_task_id_loop", task.subTaskId === undefined);

/*************************/
/** Task wait ************/
/*************************/

beginLoop("lp_wait_for_task_end_loop");
task.currentState = getTaskState(task.subTaskId);
endLoop(task,"lp_wait_for_task_end_loop", task.currentState !== 1);

/*************************/
/** Next task ************/
/*************************/

task.lineIndex++;
endLoop(task, "lp_process_script_loop", task.lineIndex < task.lineCount);

console.log("boot finished");
