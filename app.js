let countUser = document.querySelector('.counter-user'),
    countBot = document.querySelector('.counter-bot'),
    fields = document.querySelectorAll('.field'),
    userFields = document.querySelector('.user-fields'),
    botFields = document.querySelector('.bot-fields'),
    result = document.querySelector('.result'),
    play = document.querySelector('.play'),
    userStep, botStep, countU = 0, countC = 0, blocked = false
    console.log(play)

    function choiceUser (e) {
        if(blocked) return;
        let target = e.target;
        if(target.classList.contains('field')) {
        fields.forEach(item => item.classList.remove('active', 'error'))            
        userStep = target.dataset.field;
        target.classList.add('active')
        choiceBot()
        }
    }

    function choiceBot() {
        blocked = true;
        let number = Math.floor(Math.random() * 3)
        let fieldBot =  botFields.querySelectorAll('.field')
        fieldBot.forEach(item => item.classList.add('blink'))
        setTimeout(() => {
            fieldBot.forEach(item => item.classList.remove('blink'))
            fieldBot[number].classList.add('active')
            botStep = fieldBot[number].dataset.field
            winner()           
            }, 3000)
    }

    function winner () {

        blocked = false;

        switch(userStep+botStep) {
            case 'ss':
            case 'pp':
            case 'rr':
                result.innerHTML = 'Draw!'
                break;
            case 'rs':
            case 'sp':
            case 'pr':
                result.innerHTML = 'You win :))'  
                countU++
                countUser.innerHTML = countU
                botFields.querySelector(`[data-field = ${botStep}]`).classList.add('error')
                
                break;   
            case 'sr':
            case 'ps':
            case 'rp':
                result.innerHTML = 'You lose.. :(('  
                countC++
                countBot.innerHTML = countC
                userFields.querySelector(`[data-field = ${userStep}]`).classList.add('error')
                break;         
        }

            if(countU === 5) {
                playGame()
                alert('Congratulations! You are winner!')
            } else if(countC === 5) {
                playGame() 
                alert('Too bad! You are a loser :(')
            }
            
        }    

    function playGame() {
        countC = 0
        countBot.innerHTML = countC
        countU = 0
        countUser.innerHTML= countU
        result.innerHTML = 'Make a choice...'
        fields.forEach(item => item.classList.remove('active', 'error'))

    };
    
    play.addEventListener('click', playGame);
    userFields.addEventListener('click', choiceUser)