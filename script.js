const createForm = document.querySelector("form")

createForm.addEventListener("submit", async (e)=>{
    e.preventDefault()
    const memberData = new FormData(createForm)
    const reqBody = Object.fromEntries(memberData)

    const response = await fetch("/student/save", {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reqBody)
    })
    window.location.href = "/add"
})


// const deleteForm.addEventListener("delete", async (e)=>{

//     deleteForm.addEventListener()
// })