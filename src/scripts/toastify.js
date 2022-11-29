export class Toast{
    static create(text, color){
        Toastify({
            text: text,
            duration: 2000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: color,
            },
            onClick: function(){} // Callback after click
          }).showToast();
    }

}
