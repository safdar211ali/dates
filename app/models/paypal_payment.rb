class PaypalPayment
  
   def initialize(subscription)
      @subscription = subscription
    end

    def checkout_details
      process :checkout_details
    end

    def checkout_url(options)
      process(:checkout, options).checkout_url
    end

    def make_recurring
      process :request_payment
      process :create_recurring_profile, period: :daily, frequency: 1, start_at: Time.zone.now
    end
    
    def suspend
        process :suspend, :profile_id => @subscription.paypal_recurring_profile_token
    end

    def reactivate
        process :reactivate, :profile_id => @subscription.paypal_recurring_profile_token
    end
    
  private

    def process(action, options = {})
      options = options.reverse_merge(
        token: @subscription.paypal_payment_token,
        payer_id: @subscription.paypal_customer_token,
        description: @subscription.plan.name,
        amount: @subscription.plan.price,
        ipn_url: "http://areyoutaken.com/paypal/ipn",
        currency: "USD",
      )
      response = PayPal::Recurring.new(options).send(action)
      raise response.errors.inspect if response.errors.present?
      response
    end
  end