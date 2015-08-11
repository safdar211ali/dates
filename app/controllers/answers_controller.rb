class AnswersController < ApplicationController
  
  def new
    @question = Question.find(params[:question_id])
  end
  
  def show
    @question = Question.find(params[:question_id])
    @answer = Answer.find(params[:id])
  end
  
  def create
    @question = Question.find(params[:question_id])
    if @question.update_attributes(params[:question])
      conversation = @question.conversation
      conversation.move_to_trash(current_user)
      post_to_social_network
      flash[:notice] = "Your Answer has been posted to Your Profile."
      redirect_to conversations_path
    else
      render :new
    end
  end

  private

  def post_to_social_network
    access_token = nil
    if params["twitter"]
      begin
        access_token = AccessToken.find_by_user_id_and_social_network(current_user.id, 'T')
        @client = Twitter::REST::Client.new do |config|
            config.consumer_key = "awkQ6gu5lvZuBjAt5yQMCKuVS"
            config.consumer_secret = "CQEwuVlBkA4L17DcXp1jiXLWLGEsFOHV1cX6cUjWDfpqrZhbpV"
            config.access_token = access_token.access_token
            config.access_token_secret = access_token.access_secret
        end
        complete_msg = @question.question+" - "+@question.answer
        @display_message = complete_msg.length <= 110 ? complete_msg : complete_msg[0..39] + '...'
        @con_url = "http://areyoutaken.com"
        @client.update("#{@display_message} #{@con_url}")
      rescue Exception => e
        puts e.message
        puts e.backtrace
        access_token.delete if access_token.present?
      end
    end

    if params["facebook"]
      begin
        access_token = AccessToken.find_by_user_id_and_social_network(current_user.id, 'F')
        api = Koala::Facebook::API.new(access_token.access_token)
        post_details = {
                        :name => @question.question,
                        :picture => "http://ask.fm/images/155x155.png",
                        :link => "http://areyoutaken.com",
                        :description => @question.answer
                       }
        api.put_wall_post("", post_details)
      rescue Exception => e
        puts e.message
        puts e.backtrace
        access_token.delete if access_token.present?
      end
    end
  end
end
