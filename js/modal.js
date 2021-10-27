const modalWindow = document.getElementById('modal');

$('#order-form').submit((e) => {
  e.preventDefault();

  const form = $('#order-form');
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");
 
    const request = $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: "post",
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val(),
      },

      error: data => {},
    });

    request.always((data) =>{

      const message = data?.responseJSON?.message || data?.message;
      modalWindow.classList.add('modal_active');
      const modalText = document.querySelector('.modal__content');
      modalText.textContent = message;
    });
});

const closeModalBtn = document.getElementById('close-modal-btn');
closeModalBtn.addEventListener('click', event =>{
  event.preventDefault();
  modalWindow.classList.remove("modal_active");
});

