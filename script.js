const container=document.querySelector('.container');
const seats=document.querySelectorAll('.rows .seat:not(.occupied)');
const count=document.getElementById('count');
const total=document.getElementById('total');
const movieSelect=document.getElementById('movie');
let ticketPrice=+movieSelect.value;


populateUI();
//pull data from local storage to build UI
function populateUI(){
    const selectedseats=JSON.parse(localStorage.getItem('selectedSeat'))
    if(selectedseats !==null && selectedseats.length > 0){
       seats.forEach((seat,index)=>{
        if(selectedseats.indexOf(index) >- 1){
            seat.classList.add('selected');
        }
       });
    }

    const selectedMovieIndex=localStorage.getItem('selectedMovieindex')
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//function
function updateSelectedCount(){
    const selectedSeats=document.querySelectorAll('.rows .seat.selected')
    const countSelectedSeats=selectedSeats.length
    const seatIndex=[...selectedSeats].map (seat  => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeat',JSON.stringify(seatIndex))


    count.innerText=countSelectedSeats
    total.innerText=ticketPrice * countSelectedSeats
}

function setMovieData(movieIndex,moviePrice){
     localStorage.setItem('selectedMovieIndex',movieIndex)
     localStorage.setItem('selectedMovieprice',moviePrice)
}

//Event listner for change on selected movie
movieSelect.addEventListener('change',(e) =>{
    ticketPrice=+e.target.value
    setMovieData(e.target.selectedIndex,e.target.value)
    updateSelectedCount();
})

//Event listner for click on available seats
container.addEventListener('click',(e)=>{
    if(e.target.classList.contains('seat')&& !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')
        updateSelectedCount();
    }
})

updateSelectedCount();