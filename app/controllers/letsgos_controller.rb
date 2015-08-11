class LetsgosController < ApplicationController
  #load_and_authorize_resource
  def create
    @letsgo = current_user.letsgos.build(letsgo_params)
    if @letsgo.save
      flash[:notice] = "Date posted!"
			render :json => {:notice => flash[:notice]}
		else
      flash[:notice] = "Date was not posted!"
			render :json => {:notice => flash[:notice]}
		end
	end

def show
  @letsgo = Letsgo.find(username: params[:id])
  authorize! :read, @letsgo
  
end
  
  def destroy
    @letsgo = Letsgo.find(params[:id])
    @letsgo.destroy
	@letsgos = current_user.letsgos.paginate(page:1, :per_page => 3)
	flash[:notice] = "Date deleted successfully."
    render :partial => 'letsgo', :layout => nil
  end
  
  def index    
    limit = params['page'].present? ? params['page'].to_i * 10 : 0
    location_zipcodes = Location.select(:zip_code).where(:state => current_user.location.state).map(&:zip_code)
        genders = if current_user.gender.downcase == 'male'
				  if current_user.sexuality.downcase == 'gay'
				    ["Male"]
				  elsif current_user.sexuality.downcase == 'straight'
				    ["Female"]
				  else
				    ["Male", "Female"]
				  end
				else
				  if current_user.sexuality.downcase == 'gay'
				    ["Female"]
				  elsif current_user.sexuality.downcase == 'straight'
				    ["Male"]
				  else
				    ["Male", "Female"]
				  end
				end
    user_ids = User.select(:id).where(:zip_code => location_zipcodes, :gender => genders)
    @letsgos = Letsgo.where("repost_from_user_id IS NULL AND user_id IN (?)", user_ids).order("created_at ASC").offset(limit).limit(10)    
    @page = params['page'].present? ? (params['page'].to_i+1) : 1    
    render layout: 'new_application'    
  end

def eatdrink
    limit = params['page'].present? ? params['page'].to_i * 10 : 0
    location_zipcodes = Location.select(:zip_code).where(:state => current_user.location.state).map(&:zip_code)
        genders = if current_user.gender.downcase == 'male'
				  if current_user.sexuality.downcase == 'gay'
				    ["Male"]
				  elsif current_user.sexuality.downcase == 'straight'
				    ["Female"]
				  else
				    ["Male", "Female"]
				  end
				else
				  if current_user.sexuality.downcase == 'gay'
				    ["Female"]
				  elsif current_user.sexuality.downcase == 'straight'
				    ["Male"]
				  else
				    ["Male", "Female"]
				  end
				end
    user_ids = User.select(:id).where(:zip_code => location_zipcodes, :gender => genders)
    @letsgos = Letsgo.where(:tag => 'Eat/Drink').where("repost_from_user_id IS NULL AND user_id IN (?)", user_ids).order("created_at ASC").offset(limit).limit(10)    
    @page = params['page'].present? ? (params['page'].to_i+1) : 1    
    render layout: 'new_application'
end

def listenwatch
   limit = params['page'].present? ? params['page'].to_i * 10 : 0
    location_zipcodes = Location.select(:zip_code).where(:state => current_user.location.state).map(&:zip_code)
        genders = if current_user.gender.downcase == 'male'
				  if current_user.sexuality.downcase == 'gay'
				    ["Male"]
				  elsif current_user.sexuality.downcase == 'straight'
				    ["Female"]
				  else
				    ["Male", "Female"]
				  end
				else
				  if current_user.sexuality.downcase == 'gay'
				    ["Female"]
				  elsif current_user.sexuality.downcase == 'straight'
				    ["Male"]
				  else
				    ["Male", "Female"]
				  end
				end
    user_ids = User.select(:id).where(:zip_code => location_zipcodes, :gender => genders)
    @letsgos = Letsgo.where(:tag => 'Listen/Watch').where("repost_from_user_id IS NULL AND user_id IN (?)", user_ids).order("created_at ASC").offset(limit).limit(10)    
    @page = params['page'].present? ? (params['page'].to_i+1) : 1    
    render layout: 'new_application'
end

def play
    limit = params['page'].present? ? params['page'].to_i * 10 : 0
    location_zipcodes = Location.select(:zip_code).where(:state => current_user.location.state).map(&:zip_code)
        genders = if current_user.gender.downcase == 'male'
				  if current_user.sexuality.downcase == 'gay'
				    ["Male"]
				  elsif current_user.sexuality.downcase == 'straight'
				    ["Female"]
				  else
				    ["Male", "Female"]
				  end
				else
				  if current_user.sexuality.downcase == 'gay'
				    ["Female"]
				  elsif current_user.sexuality.downcase == 'straight'
				    ["Male"]
				  else
				    ["Male", "Female"]
				  end
				end
    user_ids = User.select(:id).where(:zip_code => location_zipcodes, :gender => genders)
    @letsgos = Letsgo.where(:tag => 'Play').where("repost_from_user_id IS NULL AND user_id IN (?)", user_ids).order("created_at ASC").offset(limit).limit(10)    
    @page = params['page'].present? ? (params['page'].to_i+1) : 1    
    render layout: 'new_application'
end

def explore
    limit = params['page'].present? ? params['page'].to_i * 10 : 0
    location_zipcodes = Location.select(:zip_code).where(:state => current_user.location.state).map(&:zip_code)
        genders = if current_user.gender.downcase == 'male'
				  if current_user.sexuality.downcase == 'gay'
				    ["Male"]
				  elsif current_user.sexuality.downcase == 'straight'
				    ["Female"]
				  else
				    ["Male", "Female"]
				  end
				else
				  if current_user.sexuality.downcase == 'gay'
				    ["Female"]
				  elsif current_user.sexuality.downcase == 'straight'
				    ["Male"]
				  else
				    ["Male", "Female"]
				  end
				end
    user_ids = User.select(:id).where(:zip_code => location_zipcodes, :gender => genders)
    @letsgos = Letsgo.where(:tag => 'Explore').where("repost_from_user_id IS NULL AND user_id IN (?)", user_ids).order("created_at ASC").offset(limit).limit(10)    
    @page = params['page'].present? ? (params['page'].to_i+1) : 1    
    render layout: 'new_application'
end

def other
    limit = params['page'].present? ? params['page'].to_i * 10 : 0
    location_zipcodes = Location.select(:zip_code).where(:state => current_user.location.state).map(&:zip_code)
        genders = if current_user.gender.downcase == 'male'
				  if current_user.sexuality.downcase == 'gay'
				    ["Male"]
				  elsif current_user.sexuality.downcase == 'straight'
				    ["Female"]
				  else
				    ["Male", "Female"]
				  end
				else
				  if current_user.sexuality.downcase == 'gay'
				    ["Female"]
				  elsif current_user.sexuality.downcase == 'straight'
				    ["Male"]
				  else
				    ["Male", "Female"]
				  end
				end
    user_ids = User.select(:id).where(:zip_code => location_zipcodes, :gender => genders)
    @letsgos = Letsgo.where(:tag => 'Other').where("repost_from_user_id IS NULL AND user_id IN (?)", user_ids).order("created_at ASC").offset(limit).limit(10)    
    @page = params['page'].present? ? (params['page'].to_i+1) : 1    
    render layout: 'new_application'
end

def repost
  @letsgo = Letsgo.find(params[:id]).repost(current_user)
	if request.xhr?
		render :json => {:notice => 'Repost submitted to the user.' }
	else
		redirect_to root_url
	end
  end
  
  def random
    @letsgo = Letsgo.random.first
    if request.xhr?      
    end
  end
  
  def interested
    @letsgo = Letsgo.find(params[:id])
    @content = @letsgo.content
    @recipient = @letsgo.user
    @receipt = current_user.send_message(@recipient, "Let's go...#{@content}", "#{@current_user} is Interested in your date!")
    iul = current_user.interested_users_letsgos.build
		iul.user_id = current_user.id
		iul.letsgo_id = @letsgo.id
		iul.save!
    if request.xhr?
		render :json => {:notice => "Your message was sent"}
    else
		redirect_to :back, notice: "Your message was sent"
	end
  end

private

def letsgo_params
  params.require(:letsgo).permit(:content, :tag)
end

def correct_user
  @letsgo = current_user.letsgos.find_by(id: params[:id])
  redirect_to root_url if @letsgo.nil?
end
end
