"use client"
import React, { useEffect } from 'react'

const Terms = () => {
    useEffect(()=>{window.scrollTo({
        top: 0,
        behavior: 'auto'
      });},[])
  return (
    <div className='py-3 pl-[4%] text-sm sm:text-base h-full text-white'>
    <h1 className='text-base sm:text-xl mb-3 font-semibold'>🍿Welcome to VidForum🍿</h1>
    <h3>Hello Threaders!</h3>
    <p className='mb-3'>
        Welcome to <span className='text-blue-500 font-semibold sm:text-xl'>VidForum</span>, the ultimate online haven for adventures like you. We're delighted to have you as a part of our community.
    </p>
    <h2 className='text-base sm:text-xl mb-3 font-semibold'>Terms and Conditions</h2>
    
    <h3 className='font-semibold'>1. Acceptance of Terms</h3>
    <p className='mb-3'>
        By accessing and using VidForum, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using VidForum's services, you shall be subject to any posted guidelines or rules applicable to such services.
    </p>
    
    <h3 className='font-semibold'>2. Modifications to this Agreement</h3>
    <p className='mb-3'>
        VidForum reserves the right to modify these terms and conditions at any time. Your continued use of the site after any such changes constitutes your acceptance of the new terms and conditions.
    </p>
    
    <h3 className='font-semibold'>3. User Conduct</h3>
    <p className='mb-3'>
        You agree to use the VidForum only for lawful purposes. You are prohibited from posting on or transmitting through the forum any unlawful, harmful, threatening, abusive, defamatory, obscene, vulgar, sexually explicit, hateful, or otherwise objectionable material of any kind, including, but not limited to, any material which encourages conduct that would constitute a criminal offense, give rise to civil liability, or otherwise violate any applicable local, state, national, or international law.
    </p>
    
    <h3 className='font-semibold'>4. Cloud Sharing</h3>
    <p className='mb-3'>
        One of the unique features of our forum is the ability to share your favorite files seamlessly through cloud links. It's like being in a virtual group where members can exchange recommendations, discuss, and share files that are copyright-free.
    </p>
    
    <h4 className='font-semibold'>4.1 How to Share Your Cloud Treasures:</h4>
    <p className='font-semibold'>Upload to the Cloud:</p>
    <p className='mb-2'>
        Use your preferred cloud storage service to upload your files, e.g., Mega, Filelu, etc.
    </p>
    <p className='font-semibold'>Generate Shareable Links:</p>
    <p className='mb-2'>
        Create shareable links for your files. Most cloud services provide this feature.
    </p>
    <p className='font-semibold'>Share with the Community:</p>
    <p className='mb-5'>
        Head over to the dedicated section for cloud sharing, post your link, and let the magic unfold!
    </p>
    
    <h3 className='font-semibold'>5. Intellectual Property</h3>
    <p className='mb-3'>
        The content on VidForum, excluding user-generated content, is protected by copyright, trademark, and other laws of both the United States and foreign countries. Unauthorized use of the content may violate copyright, trademark, and other laws.
    </p>
    
    <h3 className='font-semibold'>6. Limitation of Liability</h3>
    <p className='mb-3'>
        In no event shall VidForum or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on VidForum, even if VidForum or a VidForum authorized representative has been notified orally or in writing of the possibility of such damage.
    </p>
    
    <h3 className='font-semibold'>7. Governing Law</h3>
    <p className='mb-3'>
        Any claim relating to VidForum shall be governed by the laws of the State of Nigeria without regard to its conflict of law provisions.
    </p>
    <h3 className='font-semibold'>8. Copyright Infringement</h3>
    <p className='mb-3'>
        VidForum respects the intellectual property rights of others and expects users to do the same. It is our policy to terminate the accounts of repeat infringers. Do not upload, post, or otherwise transmit any content that infringes on any patent, trademark, trade secret, copyright, or other proprietary rights of any party.
    </p>
    
    <h3 className='font-semibold'>9. Underage Content</h3>
    <p className='mb-3'>
        VidForum strictly prohibits the posting or sharing of any content involving minors in any capacity. This includes, but is not limited to, any material that depicts, describes, or implies the involvement of minors in sexual or violent contexts. Violation of this policy will result in immediate account termination and reporting to the appropriate authorities.
    </p>
    
    <p className='mb-3'>
        Thank you for reading our Terms and Conditions. Enjoy your time at VidForum!
    </p>
</div>

  )
}

export default Terms