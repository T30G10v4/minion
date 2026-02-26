export class Writing {

    constructor(    
        ctx, 
        width=1920, 
        height=1080,
        text="4ll1s0n",
        font=`200px 'Black Ops One', 'Stencil', 'Impact', sans-serif`, 
        textAlign="center", 
        textBaseline="middle", 
        color="white", 
        lineWidth=10,
        strokeColor="black"
    ) 
    {

        this.ctx = ctx;
        this.ctx.font = font;
        this.ctx.textAlign = textAlign;
        this.ctx.textBaseline = textBaseline;

        // Colore del testo
        this.ctx.fillStyle = color;

        this.width = width;
        this.height = height;
        this.text = text;


        // Traccia sottile nera
        this.ctx.lineWidth = lineWidth;      // spessore bordo
        this.ctx.strokeStyle = strokeColor;

        // Disegna prima il bordo, poi il riempimento
        this.ctx.strokeText(this.text, this.width, this.height);
        this.ctx.fillText(this.text, this.width, this.height);

    }

}