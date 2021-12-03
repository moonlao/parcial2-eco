class Book{
    constructor(book){
        this.book = book;
        this.rating;
    }

    render = () => {

        let component = document.createElement("div");
        component.className = "book";

        let sendBtn = document.createElement("button");
        sendBtn.className="sendBtn";

        let bookName = document.createElement("div");
        bookName.className="bookName";
        bookName.innerHTML=this.book.name;

        let rating = document.createElement("div");
        rating.className="rating";
        let number = this.book.rating;
        rating.innerHTML=number.toFixed(1);

        let starContainer = document.createElement("div");
        starContainer.className="rate";

        for (let i = 5; i > 0; i--) {
            let starRate = document.createElement("input");
            starRate.type='radio';
            starRate.id= this.book.id+"star"+i;
            starRate.name="rate"+this.book.id;
            starRate.value=i;
            let starLabel = document.createElement("label");
            starLabel.htmlFor = this.book.id+"star"+i;
            starLabel.title="text";

            starContainer.appendChild(starRate);
            starContainer.appendChild(starLabel);

            starRate.addEventListener('click', ()=>{
                this.rating=starRate.value;
            });
        }

        let infoDiv = document.createElement("div");
        infoDiv.className="infoDiv";

        infoDiv.appendChild(bookName);
        infoDiv.appendChild(rating);
        component.appendChild(infoDiv);
        component.appendChild(starContainer);

        return component;
    };
}