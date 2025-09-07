const cl = console.log;

const blogForm = document.getElementById('blogForm');
const titleControl = document.getElementById('title');
const contentControl = document.getElementById('content');
const display = document.getElementById('display');
const loader = document.getElementById('loader');

const snackBar = (msg, icon) => {
    swal.fire({
        title: msg,
        icon: icon
    })
}

const dataArray = [
    {
      title: "Introduction to JavaScript",
      content: "JavaScript is a powerful language used to make websites interactive. It helps developers handle user actions, update content dynamically, and bring web pages to life."
    },
    {
      title: "Understanding CSS",
      content: "CSS controls the design and layout of web pages. It defines colors, fonts, spacing, and responsiveness, making sites visually appealing and user-friendly."
    },
    {
      title: "Getting Started with HTML",
      content: "HTML provides the structure of web pages by organizing text, images, and links. It forms the foundation that CSS and JavaScript build upon."
    }
  ];

const onAddBlog = (eve) => {
    eve.preventDefault()

    loader.classList.remove('d-none')

    let newBlog = {
        title: titleControl.value,
        content: contentControl.value
    }
    blogForm.reset()

    postBlog(newBlog)
       .then(res => {
        cl(res)
        return fetchBlog()
       })
       .then(data => {
        templating(data)
        snackBar(`Blog added Sucessfully !!!`, 'success')
        loader.classList.add('d-none')
       })
       .catch(err => {
        cl(err)
        snackBar(err, 'error')
        loader.classList.add('d-none')
       });

};

const postBlog = (obj) => {
    return new Promise((a, b) => {
        setTimeout(() => {
            let err = Math.random() >= 0.5 ? false : true
            if(!err){
                dataArray.unshift(obj)
                let res = `Blog saved Sucessfully !!!`
                a(res)
            }else{
                let err = `Error...while creating Blog.`
                b(err) 
            }
        }, 1800)
    })
};

const fetchBlog = () => {
    return new Promise((a, b) => {
        setTimeout(() => {
            let err = Math.random() >= 0.2 ? false : true
            if(!err){
                let data = dataArray
                a(data)
            }else{
                let err = `Error...while fetching Blog.`
                b(err) 
            }
        }, 1600)
    })
};

const templating = (arr) => {
    let result = ``
    arr.forEach(obj => {
        result += `<div class="col-md-4 mb-3">
        <div class="card h-100">
            <div class="card-header blogHead color-dark">
                <h4 class="m-0">${obj.title}</h4>
            </div>
            <div class="card-body blogBody color-light">
                <p class="m-0 text-justify">${obj.content}</p>
            </div>
            <div class="card-footer color-dark">
                <button class="btn btn-success mr-2">Like</button>
                <button class="btn btn-primary">Share</button>
            </div>
        </div>
    </div>`
    })

    display.innerHTML = result
};

blogForm.addEventListener('submit', onAddBlog);