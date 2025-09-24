function openBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    document.getElementById('modalPlayTitle').textContent = 'Выберите спектакль';
    document.getElementById('modalPlayDate').textContent = 'Кликните на места для выбора';
    
    generateSimpleSeats();
}

function generateSimpleSeats() {
    const seatsGrid = document.getElementById('seatsGrid');
    seatsGrid.innerHTML = '';
    
    for (let row = 1; row <= 5; row++) {
        for (let seatNum = 1; seatNum <= 10; seatNum++) {
            const seat = document.createElement('div');
            seat.className = 'seat';
            seat.textContent = `${row}${String.fromCharCode(64 + seatNum)}`;
            
            if (row <= 2) {
                seat.classList.add('vip');
            }

            seat.addEventListener('click', function() {
                this.classList.toggle('selected');
                updateTotalPrice();
            });
            
            seatsGrid.appendChild(seat);
        }
    }
}

function updateTotalPrice() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    let total = 0;
    
    selectedSeats.forEach(seat => {
        if (seat.classList.contains('vip')) {
            total += 30;
        } else {
            total += 15;
        }
    });
    
    document.getElementById('totalPrice').textContent = `Итого: ${total} BYN`;
}

document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            document.getElementById('bookingModal').style.display = 'none';
            document.body.style.overflow = '';
        });
    }
    
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
    
    const form = document.getElementById('bookingForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Билеты забронированы! (это демо-версия)');
            document.getElementById('bookingModal').style.display = 'none';
            document.body.style.overflow = '';
        });
    }
});
// Слайдер
class TheaterSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.dotsContainer = document.querySelector('.slider-dots');
        this.init();
    }
    
    init() {
        this.createDots();
        this.autoPlay();
        
        // Кнопки
        document.querySelector('.prev-btn').addEventListener('click', () => this.prev());
        document.querySelector('.next-btn').addEventListener('click', () => this.next());
        
        // Клик по точкам
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Пауза при наведении
        document.querySelector('.slider').addEventListener('mouseenter', () => {
            clearInterval(this.autoPlayInterval);
        });
        
        document.querySelector('.slider').addEventListener('mouseleave', () => {
            this.autoPlay();
        });
    }
    
    createDots() {
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            this.dotsContainer.appendChild(dot);
        });
    }
    
    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        document.querySelectorAll('.dot')[this.currentSlide].classList.remove('active');
        
        this.currentSlide = index;
        
        this.slides[this.currentSlide].classList.add('active');
        document.querySelectorAll('.dot')[this.currentSlide].classList.add('active');
        
        document.querySelector('.slides').style.transform = `translateX(-${this.currentSlide * 100}%)`;
    }
    
    next() {
        const nextSlide = this.currentSlide === this.slides.length - 1 ? 0 : this.currentSlide + 1;
        this.goToSlide(nextSlide);
    }
    
    prev() {
        const prevSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
        this.goToSlide(prevSlide);
    }
    
    autoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.next();
        }, 5000); 
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new TheaterSlider();
});
fetch('data/theater-data.xml')
    .then(response => response.text())
    .then(xmlString => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");
        
        const stats = xmlDoc.querySelector('seats');
        if (stats) {
            document.querySelector('.stats').innerHTML += `
                <div class="stat-item">
                    <h3>${stats.textContent}+</h3>
                    <p>Мест в зале</p>
                </div>
            `;
        }
        
        const promotions = xmlDoc.querySelectorAll('promotion');
        promotions.forEach(promo => {
            const title = promo.querySelector('title').textContent;
            const discount = promo.querySelector('discount').textContent;
            const desc = promo.querySelector('description').textContent;
            
            document.querySelector('.promo-banner').innerHTML += `
                <div class="promo-item">
                    <strong>${title}</strong> - ${discount}%<br>
                    <small>${desc}</small>
                </div>
            `;
        });
    })
    .catch(error => console.log('Ошибка загрузки XML:', error));