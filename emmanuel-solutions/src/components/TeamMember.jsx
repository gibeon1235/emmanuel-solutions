import { motion } from "framer-motion";

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
};

export function TeamMember({ member, index }) {
  return (
    <motion.div className="team-member"
      initial="hidden" whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index} variants={fadeUp}
    >
      <div className="team-member-avatar">
        {member.photo
          ? <img src={member.photo} alt={member.name} />
          : <div className="founder-avatar-placeholder">
              {member.name.split(" ").map(n => n[0]).join("")}
            </div>
        }
      </div>
      <h3>{member.name}</h3>
      <p className="team-member-role">{member.role}</p>
      {member.education && <p className="founder-education">{member.education}</p>}
      <p className="team-member-bio">{member.bio}</p>
      <div className="team-member-credentials">
        <h4>Industry Roles</h4>
        <ul>{member.credentials.map((c, i) => <li key={i}>{c}</li>)}</ul>
      </div>
      <div className="team-member-experience">
        <h4>Expertise</h4>
        <div className="expertise-tags">
          {member.experience.map((e, i) => <span key={i} className="expertise-tag">{e}</span>)}
        </div>
      </div>
    </motion.div>
  );
}
