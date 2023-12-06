import React from 'react';

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld === true ? "#59E391" : "white"
    }

    //create array to store divs on the dice face that should be shown according to random value we got
    const showDots = []
    switch (props.value) {
        case 1:
            showDots.push(5);
            break;
        case 2:
            showDots.push(3, 7);
            break;
        case 3:
            showDots.push(3, 5, 7);
            break;
        case 4:
            showDots.push(1, 3, 7, 9);
            break;
        case 5:
            showDots.push(1, 3, 5, 7, 9);
            break;
        default:
            showDots.push(4, 5, 6, 7, 8, 9);
    }

    return (
        <div
            className="die-face"
            style={styles}
            onClick={props.holdDice}
        >
            {(() => {
                const dots = [];
                // these for loop use to go through nine divs of the dice face
                for (let i = 1; i <= 9; i++) {
                    // if those i (div val) matches with (includes in) showdot array val
                    // then dispaly that div, otherwise set it display value to none
                    const styleN = {
                        display: showDots.includes(i) ? "" : "none"
                    };
                    //canno directly use dom elements, ther for put thos divs into an array
                    dots.push(<div key={i} className='dot' style={styleN}></div>);
                }
                //then return that array
                return dots;
            })()}
        </div>
    )
}
