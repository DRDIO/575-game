angular.module('575-layout')
  .factory('Modal', Modal)

function Modal (SharedState) {
  var _title = ''
  var _content = ''
  var _isClose = false
  var _fnClose = null
  var _titleClose = ''

  return {
    show: show,
    getTitle: getTitle,
    getTitleClose: getTitleClose,
    getContent: getContent,
    isClose: isClose,
    close: close
  }

  /**
   * @memberof Modal
   * @param title
   * @param content
   * @param isClose
   * @param fnClose
   * @param fnAct
   * @param titleClose
   * @param titleAct
   */
  function show (title, content, isClose, fnClose, titleClose, fnAct, titleAct) {
    _title = title
    _content = content
    _isClose = isClose
    _fnClose = fnClose
    _titleClose = titleClose

    SharedState.turnOn('appModal')
  }

  function getTitle () {
    return _title || 'Uh Oh!'
  }

  function getTitleClose () {
    return _titleClose || 'Close'
  }

  function getContent () {
    return _content || 'An error has occurred, please try again.'
  }

  function isClose () {
    return _isClose
  }

  function close () {
    if (_isClose) {
      if (_fnClose) {
        _fnClose()
      } else {
        SharedState.turnOff('appModal')
      }
    }
  }
}
