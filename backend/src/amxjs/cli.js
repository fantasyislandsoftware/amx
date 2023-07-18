    console.log("cli started");
    openWindow(20, 20, 200, 100, "CLI", { order: true, close: true });
    task.loaded = false;
    task.result = loadScript("/data/hd/System/s/Startup-sequence");
    task.result.then(function (result) { task.loaded = true; task.script = result; });
load_script_loop:
    if (!task.loaded) jmp(task, "load_script_loop");
    task.lineCount = task.script.length;
    task.lineIndex = 0;
script_loop:
    task.loaded = false;
    task.result = startTask(`/src/amxjs/${task.script[task.lineIndex]}.js`);
task_load_loop:
    task.result.then(function (result) { task.loaded = true; task.id = result; });
    if (!task.loaded) jmp(task, "task_load_loop");
    
task_wait_loop:
    task.currentState = getTaskState(task.id);
    if (task.currentState !== 1) jmp(task, "task_wait_loop");
    task.lineIndex++;
    if (task.lineIndex < task.lineCount) jmp(task, "script_loop");
    
    console.log("cli finished");
