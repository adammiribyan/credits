#coding: utf-8

module RequestsHelper
  
  def new_requests_count(count)
    declinated_name_for_request = Russian.p(count.to_i, "заявка", "заявки", "заявок")
    declinated_name_for_new = Russian.p(count.to_i, "новая", "новые", "новых")
    
    "#{count} #{declinated_name_for_new} #{declinated_name_for_request}"
  end
end
