jQuery ->
  $(document).ready ->
    bindLinkClick()
  bindLinkClick = () ->
    $("a[data-remote].letsgo_delete").bind "ajax:success", (event, data, status, xhr) ->
      $("div.lets_go .list").html(data)
      bindLinkClick()