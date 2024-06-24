const previousOperationText = document.querySelector('#previous-operation')
const currentOperationText = document.querySelector('#current-operation')
const buttons = document.querySelectorAll('#container__buttons button')

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ''
    }

    processOperation(operation) {
        if (this.currentOperationText.innerText === '') {
            if (this.previousOperationText.innerText !== '') {
                this.changeOperation(operation)
            } return
        }

        let operationValue
        const previous = +previousOperationText.innerText.split(' ')[0]
        const current = +currentOperationText.innerText

        switch (operation) {
            case '+':
                operationValue = previous + current
                this.updateDisplay(operationValue, operation, current, previous)
                break;
            case '/':
                operationValue = previous / current
                this.updateDisplay(operationValue, operation, current, previous)
                break;
            case '*':
                operationValue = previous * current
                this.updateDisplay(operationValue, operation, current, previous)
                break;
            case '-':
                operationValue = previous - current
                this.updateDisplay(operationValue, operation, current, previous)
                break;
            case 'C':
                this.processCurrentClear()
                break
            case 'CE':
                this.processAllClear()
                break
            case 'DEL':
                this.processDel()
                break
            case '=':
                this.processEquals()
                break
            default:
                return

        }
    }

    addDigit(digit) {
        if (this.currentOperationText.innerText.includes('.') && digit === '.') return

        this.currentOperation = digit
        this.updateDisplay()
    }

    updateDisplay(
        operationValue = null,
        operation = null,
        previous = null,
        current = null
    ) {

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation
        } else {
            if (previous === 0) {
                operationValue = current
            }

            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ''
        }
    }

    changeOperation(operation) {
        const mathOperation = ['+', '-', '*', '/']

        if (!mathOperation.includes(operation)) {
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation
    }

    processCurrentClear() {
        this.currentOperationText.innerText = ''
    }

    processAllClear() {
        this.currentOperationText.innerText = ''
        this.previousOperationText.innerText = ''
    }

    processDel() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }

    processEquals() {
        const operation = this.previousOperationText.innerText.split(' ')[1]

        this.processOperation(operation)
    }
}

const calc = new Calculator(
    previousOperationText,
    currentOperationText
)

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.innerText

        if (+value >= 0 || value === '.') {
            calc.addDigit(value)
        } else {
            calc.processOperation(value)
        }
    })
});