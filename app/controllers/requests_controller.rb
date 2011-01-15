class RequestsController < ApplicationController
  before_filter :authenticate, :only => [:index, :show, :destroy]
  load_and_authorize_resource :request
  
  def index
    @requests = Request.all:order => 'created_at desc'

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @requests }
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
end
