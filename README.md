# DBN Compiler.

A compiler for small drawing language dbn(Design by Numbers).

The original DBN language has only three commands. Paper, Pen and Line. This compiler extends the language with more useful features like variables and loops.  

This compiler outputs SVG code

## Supported Keywords

- [x] Paper
- [x] Pen
- [x] Line
- [ ] Other shapes
- [x] Single Line Comments 
- [x] Set (variable)
- [x] Do loop
- [ ] Conditional loop
- [x] Variable Operators
- [ ] Nested block

## Keyword description

Paper creates the sheet to draw on. Only one parameter is expected. This changes the color of the sheet. Currently only grayscale is supported.

> Paper `value`

---

Pen creates the pen to draw with. Only one parameter is expected. This changes the color of the sheet. Currently only grayscale is supported.

> Pen `value`

---

Line draws a line. Line expects four parameters which represent X and Y of the two endings. 

> Line `x1` `y1` `x2` `y2`

---

Set creates a variable that can be named as you like. 

> Set `name` `value`

You can get the value stored in the variable with @ and the variable name. 

> @`name`

--- 

The language currently supports two variable operators. These are Add and Sub. 

> Add `variable` `value`

or

> Sub `variable` `value`

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
