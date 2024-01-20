class CardContainer{

    static maxLine = 0;
    static cardsByColumn = [];
    static cardsByColumnLineCounts = [];

    resetCards() {
        CardContainer.cardsByColumn = [];    
        CardContainer.cardsByColumnLineCounts = [];    
    }

    addCard(card) {
        CardContainer.cardsByColumn.push(card)
        CardContainer.cardsByColumnLineCounts.push(card.lineCount)
    }

    cardsLineCounts() {
        return CardContainer.cardsByColumnLineCounts
    }
    cards() {
        return CardContainer.cardsByColumn
    }
}
var CardContainerObject = new CardContainer();

class Card extends CardContainer{
    constructor(item, titleHeight, lineHeight) {
        super();
        this.item = item;
        this.titleHeight = titleHeight;
        this.lineHeight = lineHeight;
        this.lineCount = this.getLineCount(this.titleHeight,this.lineHeight)

        this.addCard(this)
    }

    getLineCount(titleHeight, lineHeight) {
        return titleHeight / lineHeight
    }
}

function alignCards(settings) {
    let column;
    let willWork = false;

    Object.entries(settings.breakpoints).forEach(([width,value]) => {
        if(window.matchMedia(`(min-width:${width}px)`).matches) {
            column = value.columns;
            willWork = true;
        }
        else {
            // It is checked whether the itemHeight function will work or not.
            if (willWork) return;
            willWork = false;
        }
    })
    
    if(willWork) {
        itemHeight()
    }
    
    function itemHeight() {
        let itemIndex=0;

        document.querySelectorAll(settings.trigger).forEach(item => {
            let title = item.querySelector(".ticket > *");
            let titleHeight = item.querySelector(".ticket > *").clientHeight;
            let lineHeight = parseInt(window.getComputedStyle(title).lineHeight);
            
            var card = new Card(item, titleHeight, lineHeight);

            item.querySelector(".ticket").setAttribute("data-row",card.lineCount)
            
            itemIndex++;
            
            if (itemIndex === column) {
                let maxLine = Math.max(...CardContainer.cardsByColumnLineCounts)
                CardContainer.maxLine = maxLine
                
                setCardAttr();
                CardContainerObject.resetCards();
                
                itemIndex = 0;
            }
        })

        if(CardContainer.cardsByColumn.length > 0) {
            lastRowAlign()
        }

        function lastRowAlign() {
            let maxLine = Math.max(...CardContainer.cardsByColumnLineCounts)
            CardContainer.maxLine = maxLine
            
            setCardAttr();
            
            CardContainerObject.resetCards();
            itemIndex=0;
        }

        function setCardAttr() {
            Object.entries(CardContainer.cardsByColumn).forEach(([index,value]) => {
                value.item.querySelector(".ticket").setAttribute("data-row",CardContainer.maxLine)
            })
        }
    }
}