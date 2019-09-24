# DBN Compiler.

A compiler for small drawing language dbn(Design by Numbers).

The original DBN language has only three commands. Paper, Pen and Line. This compiler extends the language with more useful features like variables and loops.  

This compiler outputs SVG code

## Supported Keywords

- [x] Paper
- [x] Pen
- [x] Line
- [x] Other shapes
- [x] Single Line Comments 
- [x] Set (variable)
- [x] Do loop
- [x] Variable Operators
- [ ] Nested block

## Keyword description

Paper creates the sheet to draw on. Only one parameter is expected. This changes the color of the sheet. Currently only grayscale is supported.

> Paper `value`

---

The APaper works basically like the normal Paper Keyword with the difference that APaper (Advanced Paper) gives the possibility to change the page size. Currently only grayscales are supported. APaper expects three parameters.

> APaper `color` `width` `height`

---

Pen creates the pen to draw with. Only one parameter is expected. This changes the color of the sheet. Currently only grayscale is supported.

> Pen `value`

---

The APan gives the possibility to change the colour of the line. APen expects three parameters from 0 to 100

> APen `Red` `Green` `Blue`

---


Line expects four parameters which represent X and Y of the two endings. 

> Line `x1` `y1` `x2` `y2`

---

Circle expects three parameters. Two for the positions X and Y and one for the radius. I don't think I need to explain what is does.

> Circle `x` `y` `r`

---

Ellipse expects four parameters. 

> Ellipse `cx` `cy` `rx` `ry`

---

Set creates a variable that can be named as you like. 

> Set `name` `value`

You can get the value stored in the variable with @ and the variable name. 

> @`name`

--- 

The language currently supports seven variable operators.

**Addition**
> Add `value` `variable`

**Subtraction**
> Sub `value` `variable`

**Multiplication**
> Mul `value` `variable` 

**Division**
> Div `value` `variable`

**Modulo**
> Mod `value` `variable`

**Exponential**
> Pow `value` `variable`

**Root from N**
> Root `value` `variable`

---

Do is a simple loop that is executed as often as we specified.

> Do 
> {
> `code`
> }

## DBN examples

Draw a line
```text
Paper 100
Pen 0
Line 0 50 100 50
```

---

Draw a beam
```text
Paper 100
Pen 0
Set a 0
Do 11
{
    Line 0 50 100 @a
    Add 10 @a
}
```

---

Draw Star
```text
Paper 100
Pen 0
Set a 0
Set b 100
Do 10
{
    Line 0 @b 100 @a
    Add 10 @a
    Sub 10 @b
}
Do 10
{
    Line @b 0 @a 100
    Add 10 @b
    Sub 10 @a
}
```

---

Draw three coloured lines
```text
Paper 100
APen 100 0 0
Line 0 25 100 25

APen 0 100 0
Line 0 50 100 50

APen 0 0 100
Line 0 75 100 75
```