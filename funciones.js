//Variables Globales
var Na = 0, cant=90, ini=10;

function Rand(x)
{ return Math.floor(Math.random() * x); }

class nodo
{ constructor(info, pre, sig)
	{ this.data = info;
		this.prev = pre;
		this.next = sig;
	}
}

class ListaCirDoble
{ constructor()
	{ this.head = null;
		this.tail = null;
		this.size = 0;
	}

	AddHead(info)
	{ const NewNodo = new nodo(info, this.tail, this.head);
		if(!this.head)
			this.head =  this.tail = NewNodo.prev = NewNodo.next = NewNodo;
		else
		{ this.head.prev = NewNodo;
			this.tail.next = NewNodo;
			this.head = NewNodo;
		}
		this.size++;
	}
    
	AddTail(info) {
        const NewNodo = new nodo(info, this.tail, this.head);
        if (!this.head) {
            this.head = this.tail = NewNodo.prev = NewNodo.next = NewNodo;
        } else {
            this.head.prev = NewNodo;
            this.tail.next = NewNodo;
            this.tail = NewNodo;
        }
        this.size++;
    }

    AddAt(info, pos) {
        if (pos< 0 || pos > this.size) {
            alert("Posición inválida");
            return;
        }
        if (pos === 0) {
            this.AddHead(info);
        } else if (pos === this.size) {
            this.AddTail(info);
        } else {
            let temp = this.head;
            for (let i = 0; i < pos- 1; i++) {
                temp = temp.next;
            }
            const newNodo = new nodo(info, temp, temp.next);
            temp.next.prev = newNodo;
            temp.next = newNodo;
            this.size++;
        }
    }

    DelHead() {
        if (!this.head) {
            return;
        }
        if (this.size === 1) {
            this.head = this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = this.tail;
            this.tail.next = this.head;
        }
        this.size--;
    }

    DelTail() {
        if (!this.head) {
            return;
        }
        if (this.size === 1) {
            this.head = this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = this.head;
            this.head.prev = this.tail;
        }
        this.size--;
    }

    DelAt(pos) {
        if (pos < 0 || pos >= this.size) {
            alert("Posición inválida");
            return;
        }
        if (pos === 0) {
            this.DelHead();
        } else if (pos === this.size - 1) {
            this.DelTail();
        } else {
            let temp = this.head;
            for (let i = 0; i < pos; i++) {
                temp = temp.next;
            }
            temp.prev.next = temp.next;
            temp.next.prev = temp.prev;
            this.size--;
        }
    }
	DelIgualA(info) {
		if (!this.head) {
			return;
		}
	
		let cur = this.head;
		do {
			if (cur.data === info) {
				if (this.size === 1) {
					this.head = this.tail = null;
				} else if (cur === this.head) {
					this.DelHead();
				} else if (cur === this.tail) {
					this.DelTail();
				} else {
					cur.prev.next = cur.next;
					cur.next.prev = cur.prev;
					this.size--;
				}
				return; 
			}
			cur = cur.next;
		} while (cur !== this.head);
	}
}

var Lista = new ListaCirDoble(); //Instanciación

function Print()
{ var n, i, k, Tx, Valor;
	document.getElementById('store').innerHTML = "";
	Valor = Lista.head;
	if(Lista.size<=5)
	{	for(k=0; k<Lista.size; k++)
		{ Tx = "<p>"+Valor.data+"<br>"+k+"</p>"; //imprime el valor del nodo y en la parte inferior imprime su posición
			document.getElementById('store').innerHTML += Tx;
			Valor = Valor.next;
		}
	}
	else
	{ for(i=0; i<Na; i++)
			Valor = Valor.next;
		for(k=0; k<5; k++)
		{ n = i + k; //para imprimir la posición del nodo dentro de la lista
			if(n>=Lista.size)
				n-=Lista.size;
			Tx = "<p>"+Valor.data+"<br>"+n+"</p>"; //imprime el valor del nodo y en la parte inferior imprime su posición
			document.getElementById('store').innerHTML += Tx;
			Valor = Valor.next;
		}
	}
	Mensaje();
}

function Ant() //para regresar un nodo en la impresión de la lista
{ Na--;
	if(Na<0)
		Na=Lista.size-1;
	Print();
}

function Sig() //para avanzar un nodo en la impresión de la lista
{ Na++;
	if(Na>=Lista.size)
		Na=0;
	Print();
}

function AddHead()
{ var t;
  t = Rand(cant)+ini;
	Lista.AddHead(t.toString());
	Print();
}
function AddTail() {
    var t;
    t = Rand(cant)+ini;
    Lista.AddTail(t.toString());
    Print();
}

function AddAt() {
    var t, pos;
    t = Rand(cant) + ini;
    pos = parseInt(prompt("Ingrese la posición:"));
    Lista.AddAt(t.toString(), pos);
    Print();
}
function DelHead() {
    Lista.DelHead();
    Print();
}
function DelTail() {
    Lista.DelTail();
    Print();
}
function DelAt() {
    var pos;
    pos = parseInt(prompt("Ingrese la posición:"));
    Lista.DelAt(pos);
    Print();
}
function DelIgualA() {
    var info = prompt("Ingrese el contenido a eliminar:");
    Lista.DelIgualA(info);
    Print();
}
function Mensaje() //Para imprimir el tamaño de la lista
{	document.getElementById('Msg0').innerHTML = "Tamaño: " + Lista.size;
}
function Iniciar()
{ Mensaje();
}

window.onload=Iniciar;