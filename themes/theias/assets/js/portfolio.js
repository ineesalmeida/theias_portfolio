
sum = (_array) => _array.reduce((a, b) => a + b, 0);



const portfolio_container = document.getElementById('portfolio-container');
const original_images = Array.from(portfolio_container.getElementsByClassName('portfolio__card'));

function PortfolioAlign() {
    let images_width = original_images.map(_img => {
        let img = _img.getElementsByTagName("img")[0];
        return img.naturalWidth * _img.clientHeight / img.naturalHeight;
    });
    let total_image_length = sum(images_width);
    let target_width = portfolio_container.clientWidth;
    let images = [...original_images];
    let n_lines = Math.ceil(total_image_length / target_width);

    let _line_images, _line_images_length, _sum_images_length;
    for (let i = 0; i <= n_lines; i++) {
        _line_images = [];
        _line_images_length = [];
        _sum_images_length = 0;
        while (_sum_images_length + images_width[0] < target_width) {
            _line_images.push(images.shift());
            _line_images_length.push(images_width.shift());
            _sum_images_length = sum(_line_images_length)
        }

        let _new_images_length = _line_images_length.map(l => l * (target_width - 20) / _sum_images_length)

        // On the last line, check if width is close to target before making them suoer large
        if (i < n_lines ||
            _sum_images_length > 0.5 * target_width) {
            _line_images.forEach((img, _i) => {
                img.style.width = _new_images_length[_i] + 'px';
            })
        }
    }
}

function RemoveStyleFromPortfolio() {
    original_images.map(img => img.style.width = null)
}

PortfolioAlign();
var medium_media = window.matchMedia("(min-width: 600px");
window.addEventListener('resize', function (event) {
    if (medium_media.matches) {
        PortfolioAlign();
    } else {
        RemoveStyleFromPortfolio();
    }
});
