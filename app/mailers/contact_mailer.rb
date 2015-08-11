class ContactMailer < ActionMailer::Base
  default :from => "no-reply@areyoutaken.com"  

    def new_contact(contact)
      @contact = contact
      mail(to: 'yo@areyoutaken.com', subject: 'Contact us Form')
    end

  end