async function deleteStudent(id){
    await fetch('/delete/student/' + id, {method: "DELETE"});
    window.location.href= "/admin/team"
}


async function updateStudent(e,id){
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());

    await fetch('/update/' + id,{
        method:"PATCH",
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(formObject)
    })
    window.location.href = '/admin/team'

}