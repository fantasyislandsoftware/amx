console.log("boot init");

/*************************/
/** Load script **********/
/*************************/

task.result = loadScript("/data/hd/System/s/Startup-sequence");
beginLoop("lp_load_script");
task.c = equals(task.result.isFulfilled(), true);
endLoop(task, "lp_load_script", !task.c);
task.script = convertScriptToJS(task.result.getData().data);

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

task.id = eval(task.line);
task.id.then(function (result) { task.id = result; });
beginLoop("lp_get_task_id_loop");
endLoop(task,"lp_get_task_id_loop", task.id === undefined);

/*************************/
/** Task wait ************/
/*************************/

beginLoop("lp_wait_for_task_end_loop");
task.currentState = getTaskState(task.id);
endLoop(task,"lp_wait_for_task_end_loop", task.currentState !== 1);

/*************************/
/** Next task ************/
/*************************/

task.lineIndex++;
endLoop(task, "lp_process_script_loop", task.lineIndex < task.lineCount);

console.log("boot finished");
