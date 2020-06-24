let addServer = document.getElementById("addServer");
let removeServer = document.getElementById("removeServer");
let taskElems = [];
let serverElems = [];
let tasks = 0
let runningServers = document.getElementById("runningServers");


addServer.addEventListener("click", () => {
    if (taskElems.length == 0) {
        alert("No need to start any server as task list is 0")

    }
    else if (serverElems.length == 10) {
        alert("Server Limit Exceeded")

    }
    else if (serverElems.length == taskElems.length) {
        alert("No more servers required!!!")

    }
    else {
        serverElems.push(1)
        runningServers.innerHTML = `Servers Running: ${serverElems.length}`
        processTasks()
    }

})

removeServer.addEventListener("click", () => {
    serverElems.pop();
    runningServers.innerHTML = `Servers Running: ${serverElems.length}`

})

const processTasks = () => {
    // Check if atleast 1 server is running
    if (serverElems.length != 0) {

        // Loop through all tasks available for every server running
        for (let i = 0; i <= taskElems.length; i++) {
            // Check is task is already in process or processed
            if (taskElems[i].processing == 0) {
                taskElems[i].processing = 1;
                taskElems[i].removeTask.remove()  // remove delete option when task is running

                let k = 0

                //Set time interval of 20 seconds for single task completion
                const interval = setInterval(() => {
                    if (serverElems.length != 0) {
                        // Set task status at the very begining so other server doesnt work on the very same task
                        taskElems[i].processing = 1;
                        if (k <= 20) {
                            if (taskElems[i].removeTask) {
                                taskElems[i].removeTask.remove()
                            }

                            taskElems[i].node.setAttribute("value", `${k * 5}`)
                            taskElems[i].node.setAttribute("data-label", `00:${k}`)
                            k++;
                        }
                        else {

                            taskElems[i].node.remove()
                            taskElems[i].removeTask.remove()

                            //Empty servers if all tasks are done
                            isAllProcessed() && serverElems.pop()

                            runningServers.innerHTML = `Servers Running: ${serverElems.length}`
                            k = 0
                            i++
                            return;


                        }
                    }
                    else {

                        clearInterval(interval)

                        return;
                    }
                }, 1000);

                break;

            }

            continue;



        }

    }
}

const isAllProcessed = () => {
    for (let i = 0; i < taskElems.length; i++) {
        if (taskElems[i].processing == 0) {
            return false
        }
    }

    return true;
}


let taskNumber = document.getElementById("taskNumber");
taskNumber.addEventListener("change", (e) => {
    if (e.target.value >= 0) {
        tasks = e.target.value
    }
})


let addTask = document.getElementById("addTask");
addTask.addEventListener("click", () => {

    let taskList = document.getElementById("taskList");
    for (let i = 0; i < tasks; i++) {
        const node = document.createElement("PROGRESS");
        node.setAttribute("value", "0");
        node.setAttribute("max", "100");
        node.setAttribute("data-label", "Waiting...")
        const removeTask = document.createElement("IMG")
        removeTask.setAttribute("src", "new.png")
        removeTask.setAttribute("style", "width:1.5% ; margin-left:1rem ; cursor:pointer")
        const id = Math.floor(Math.random() * 100);
        removeTask.innerHTML = "Remove"
        removeTask.addEventListener("click", () => {
            node.remove();
            removeTask.remove()
            taskElems.forEach((elem, index) => {
                if (elem.id == id) {
                    taskElems.splice(index, 1)

                }
            })

        })
        let processing = 0
        taskElems.push({ node, removeTask, processing, id })
        taskList.appendChild(node)
        taskList.appendChild(removeTask)

    }

})




