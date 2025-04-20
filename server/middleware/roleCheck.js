function checkRole(requiredRole) {
    return (req, res, next) => {
      const userRoles = req.auth?.payload['https://communitycareacc.com/roles'] || [];
      
      if (Array.isArray(userRoles) && userRoles.includes(requiredRole)) {
        return next();
      }
      
      return res.status(403).json({
        error: {
          message: 'Insufficient permissions',
          status: 403
        }
      });
    };
  }
  
  module.exports = {
    checkRole
  };