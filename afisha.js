 document.addEventListener('DOMContentLoaded', function() {
            const modal = document.getElementById('bookingModal');
            const closeModal = document.querySelector('.close-modal');
            const bookButtons = document.querySelectorAll('.book-btn');
            const modalPlayTitle = document.getElementById('modalPlayTitle');
            const modalPlayDate = document.getElementById('modalPlayDate');
            const seatsGrid = document.getElementById('seatsGrid');
            const totalPriceElement = document.getElementById('totalPrice');
            const bookingForm = document.getElementById('bookingForm');
            
            let currentPlay = '';
            let currentDate = '';
            let totalPrice = 0;
            let selectedSeats = [];
            
            const playPrices = {
                'Двенадцатая ночь': { standard: 15, vip: 30 },
                'Фауст': { standard: 25, vip: 50 },
                'Пиковая Дама': { standard: 15, vip: 30 },
                'Граф Монте-Кристо': { standard: 20, vip: 40 }
            };
            
            bookButtons.forEach(button => {
                button.addEventListener('click', function() {
                    currentPlay = this.getAttribute('data-play');
                    currentDate = this.getAttribute('data-date');
                    
                    modalPlayTitle.textContent = currentPlay;
                    modalPlayDate.textContent = currentDate;
                    
                    generateSeats();
                    modal.style.display = 'block';
                });
            });
            
            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
                resetBooking();
            });
            
           function generateSeats() {
    seatsGrid.innerHTML = '';
    totalPrice = 0;
    selectedSeats = [];
    totalPriceElement.textContent = 'Итого: 0 BYN';
    
    for (let row = 1; row <= 5; row++) {
        for (let seatNum = 1; seatNum <= 10; seatNum++) {
            const seat = document.createElement('div');
            seat.className = 'seat';
            seat.textContent = `${row}${String.fromCharCode(64 + seatNum)}`;
            
            const isVip = row <= 2;
            
            if (isVip) {
                seat.classList.add('vip');
            }
            
            seat.addEventListener('click', function() {
                this.classList.toggle('selected');
                
                const seatType = this.classList.contains('vip') ? 'vip' : 'standard';
                const seatPrice = playPrices[currentPlay][seatType];
                const seatId = this.textContent;
                
                if (this.classList.contains('selected')) {
                    totalPrice += seatPrice;
                    selectedSeats.push(seatId);
                } else {
                    totalPrice -= seatPrice;
                    const index = selectedSeats.indexOf(seatId);
                    if (index > -1) {
                        selectedSeats.splice(index, 1);
                    }
                }
                
                totalPriceElement.textContent = `Итого: ${totalPrice} BYN`;
            });
            
            seatsGrid.appendChild(seat);
        }
    }
}
            
            function resetBooking() {
                totalPrice = 0;
                selectedSeats = [];
                bookingForm.reset();
            }
            
            bookingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (selectedSeats.length === 0) {
                    alert('Пожалуйста, выберите хотя бы одно место!');
                    return;
                }
                
                const name = document.getElementById('name').value;
                
                alert(`${name}, ваши билеты на "${currentPlay}" успешно забронированы!\nДата: ${currentDate}\nМеста: ${selectedSeats.join(', ')}\nСумма: ${totalPrice} BYN`);
                
                modal.style.display = 'none';
                resetBooking();
            });
        });