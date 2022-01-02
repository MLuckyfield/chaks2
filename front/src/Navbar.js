import axios from 'axios';
const Navbar = () => {
      return (


          <nav id="mainav">

                <a href="/dash" class="nav-item nav-link active">Dashboard</a>
                <a href="/" class="nav-item nav-link disabled" tabindex="-1">Reports</a>
              <a href="/signup" class="nav-item nav-link">Sign Up</a>
                <a href="/login" class="nav-item nav-link">Login</a>

                </nav>

      )
  }

  export default Navbar
