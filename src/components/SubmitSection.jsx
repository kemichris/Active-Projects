import React from 'react'

export const SubmitSection = () => {
  return (
    <div className='submit-container'>
        <h3 className='primary-color'>Sumbit Address</h3>
        <p className='txt-white'>Ready to make your voice heard? We invite all interested users to participate in the voting process. 
            Simply submit your Ethereum Virtual Machine (EVM) address in the space below and hit the submit button.
        </p>
        <form action="">
            <input type="text" placeholder='voters address' name="" className='primary-color' required />
            <p className='txt-white'>By submitting your address, you gain the power to influence the future. 
                Be a part of the decision-making process. submit now!
            </p>
            <button type="submit" className=' submit-btn txt-white'>Submit</button>
        </form>
    </div>
  )
}
