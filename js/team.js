const btn_names = document.querySelectorAll('.member__name');

btn_names.forEach(item => {

    item.addEventListener('click', function (event) {
        const parentEl = event.target.parentElement.parentElement;
        const memberDescription = parentEl.querySelector('.member__description');
        const arrow = parentEl.querySelector('.member__name-arrow');
        const photo = parentEl.querySelector('.member__photo');

        if (arrow.classList.contains('member__name-arrow_rotated')) {
            arrow.classList.remove('member__name-arrow_rotated');
        } else {
            arrow.classList.add('member__name-arrow_rotated');
        }

        if (memberDescription.classList.contains('member__description_visible')) {
            memberDescription.classList.remove('member__description_visible');
        } else {
            memberDescription.classList.add('member__description_visible');
        }

        if (photo.classList.contains('member__photo_visible')) {
            photo.classList.remove('member__photo_visible');
        } else {
            photo.classList.add('member__photo_visible');
        }
    });
})

