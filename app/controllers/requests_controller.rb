class RequestsController < ApplicationController
  before_filter :show_additional_details, :only => :index
  before_filter :authenticate, :only => [:index, :show, :destroy]
  load_and_authorize_resource :request
  
  def index
    @last_request_created_at = Request.last.created_at
    @requests = Request.all:order => 'created_at desc'    

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @requests }
    end
  end
  
  def check_for_new_requests
    @requests_count = Request.all.count
    @current_requests_count = params[:count].to_i
    unless @request_count == @current_requests_count
      @new_requests_count = @requests_count - @current_requests_count
    end

    respond_to do |format|
      format.js { render :layout => false } # check_for_new_requests.js.haml
    end
  end
  
  def fetch_new_requests
    @requests_count = Request.all.count
    @current_requests_count = params[:count].to_i
    unless @request_count == @current_requests_count
      @new_requests_count = @requests_count - @current_requests_count
      
      @new_requests = Request.all.last(@new_requests_count).reverse
    end

    respond_to do |format|
      format.js { render :layout => false } # fetch_new_requests.js.haml
    end
  end
  
  def update_requests_count
    @requests_count = Request.all.count
    
    respond_to do |format|
      format.js { render :layout => false } # update_requests_count.js.haml
    end
  end

  def show
    @request = Request.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @request }
    end
  end

  def new
    @request = Request.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @request }
    end
  end

  def create
    @request = Request.new(params[:request])

    respond_to do |format|
      if @request.save
        flash[:notice] = t("app.flashes.requests.create")
        format.html { render :action => "new" }
      else
        format.html { render :action => "new" }
      end
    end
  end

  def destroy
    @request = Request.find(params[:id])
    @request.destroy

    respond_to do |format|
      format.html { redirect_to(requests_url) }
      format.xml  { head :ok }
    end
  end
  
  
  private
  
    def show_additional_details
      @show_additional_details = true
    end
end
