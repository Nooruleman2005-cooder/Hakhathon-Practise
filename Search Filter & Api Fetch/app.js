const users = document.querySelector('.user-list');
const search = document.getElementById('search');
const searchInput = document.getElementById('searchInput');
let allUsers = [];

const getUsers = async()=>{
    try{
     const res = await fetch('https://api.github.com/users');
     const data = await res.json();
        console.log(data);

           allUsers = data;
            users.innerHTML='';
        
        data.map((user)=>{
            const li = document.createElement('li');
            li.innerHTML=`
                <div class="card mb-3" style="max-width: 540px; margin: 20px 300px;">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${user.avatar_url}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${user.login}</h5>
                      <p class="card-text">${user.html_url}</p>
                      <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                  </div>
                </div>
              </div>
            `
            users.appendChild(li);
        })
    }
    catch(err){
       console.log("Error Fethching Data", err)
    }
}

const filterUsers = (searchTerm) =>{
    const filtered = allUsers.filter(user=>user.login.toLowerCase().includes(searchTerm.toLowerCase())
);
users.innerHTML = '';
 filtered.map((user)=>{
    const li = document.createElement('li');
            li.innerHTML=`
                <div class="card mb-3" style="max-width: 540px; margin: 20px 300px;">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${user.avatar_url}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${user.login}</h5>
                      <p class="card-text">${user.html_url}</p>
                      <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                  </div>
                </div>
              </div>
            `
            users.appendChild(li);
        });
        if(filtered.length === 0){
            users.innerHTML = `<li><p style="text-align:center;">No user found 😢</p></li>`;
        }
}

search.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchText = searchInput.value.trim();
    filterUsers(searchText);
});

getUsers();